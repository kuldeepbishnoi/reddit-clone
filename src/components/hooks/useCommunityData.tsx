import { authModalState } from "@/src/atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  communitiesState,
} from "@/src/atoms/communitiesAtom";
import { auth, firestore } from "@/src/firebase/clientApp";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communitiesState);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onJoinorLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    setLoading(true);
    if (isJoined) {
      leaveCommunity(communityData.id);
    } else {
      joinCommunity(communityData);
    }
    setLoading(false);
  };

  //update community state value
  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      console.log(`users/${user?.uid}/communitySnippets`);
      console.log(snippetDocs.docs);
      const snippet = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippet as CommunitySnippet[],
      }));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
    console.log(communityStateValue);
  }, [user]);

  const leaveCommunity = async (communityId: string) => {
    // creating a new community snippet
    try {
      const batch = writeBatch(firestore);
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      batch.update(doc(firestore, `communities`, communityId), {
        numberOfMembers: increment(-1),
      });
      await batch.commit();
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (c) => c.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log(error);
    }
  };
  const joinCommunity = async (communityData: Community) => {
    // creating a new community snippet
    try {
      console.log("join community");
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      batch.update(doc(firestore, `communities`, communityData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit();
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    communityStateValue,
    onJoinorLeaveCommunity,
    loading,
  };
};

export default useCommunityData;

import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMember: number;
  privacyType: "public" | "private" | "protected";
  cratedAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
}

const initialState: CommunityState = {
  mySnippets: [],
};

export const communitiesState = atom({
  key: "communitiesAtom",
  default: initialState,
});

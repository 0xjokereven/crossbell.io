import {
	NoteLinkType,
	SCOPE_KEY_NOTE_LIKES,
	SCOPE_KEY_NOTE_STATUS,
} from "@crossbell/indexer";

import { linkNote, siweLinkNote } from "../../apis";
import {
	AccountTypeBasedMutationOptions,
	createAccountTypeBasedMutationHooks,
} from "../account-type-based-hooks";

export type UseLinkNoteOptions = AccountTypeBasedMutationOptions<
	typeof useLinkNote
>;

export const useLinkNote = createAccountTypeBasedMutationHooks<
	NoteLinkType,
	{ characterId: number; noteId: number },
	boolean
>({ actionDesc: "", withParams: true }, (linkType) => ({
	async email({ characterId, noteId }, { account }) {
		if (account) {
			await linkNote({
				token: account.token,
				toCharacterId: characterId,
				toNoteId: noteId,
				linkType: linkType,
			});

			return true;
		} else {
			return false;
		}
	},

	async contract({ characterId, noteId }, { account, siwe, contract }) {
		if (account?.characterId) {
			if (siwe) {
				await siweLinkNote({
					siwe,
					characterId: account.characterId,
					toCharacterId: characterId,
					toNoteId: noteId,
					linkType: linkType,
				});
			} else {
				await contract.linkNote(
					account.characterId,
					characterId,
					noteId,
					linkType
				);
			}

			return true;
		} else {
			return false;
		}
	},

	onSuccess({ variables, queryClient }) {
		const { noteId, characterId } = variables;

		return Promise.all([
			queryClient.invalidateQueries(SCOPE_KEY_NOTE_LIKES(characterId, noteId)),
			queryClient.invalidateQueries(SCOPE_KEY_NOTE_STATUS(characterId, noteId)),
		]);
	},
}));

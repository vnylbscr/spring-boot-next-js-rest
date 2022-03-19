import { Note, User } from "types";
import create from "zustand";
import { combine } from "zustand/middleware";

type TabType = "active" | "completed";

const useStore = create(
  combine(
    {
      selectedNote: null as unknown as Note | null,
      notes: [] as Note[],
      isDrawerOpen: false,
      activeTab: "active" as TabType,
      isOpenModal: false,
      deletedNote: null as unknown as string,
      editedNote: null as unknown as Note | null,
      token: null as unknown as string,
      user: null as unknown as User | null,
    },
    (set) => ({
      setSelectedNote: (note: Note | null) =>
        set({
          selectedNote: note,
        }),
      setNotes: (notes: Note[]) =>
        set({
          notes,
        }),
      setIsDrawerOpen: (isOpen: boolean) =>
        set({
          isDrawerOpen: isOpen,
        }),
      setActiveTab: (tab: TabType) =>
        set({
          activeTab: tab,
        }),
      setIsOpenModal: (isOpen: boolean) =>
        set({
          isOpenModal: isOpen,
        }),
      setDeletedNote: (note: string) =>
        set({
          deletedNote: note,
        }),
      setEditedNote: (note: Note | null) =>
        set({
          editedNote: note,
        }),
      setToken: (token: string) =>
        set({
          token,
        }),
      setUser: (user: User | null) =>
        set({
          user,
        }),
    })
  )
);

export default useStore;

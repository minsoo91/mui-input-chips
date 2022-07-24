import { Dispatch, useReducer } from "react";

export enum ListUpdateActionType {
    DELETE_ONE,
    DELETE_LAST,
    ADD,
}

export type ListUpdateAction<T> = {
    type: ListUpdateActionType;
    targetListItem?: T;
};

type ObjectWithId = {
    id: string | number;
};

export default function useListReducer<
    T extends ObjectWithId | string
>(
    initialList: T[]
): [T[], Dispatch<ListUpdateAction<T>>] {
    const reducer = (
        list: T[],
        action: ListUpdateAction<T>
    ) => {
        switch (action.type) {
            case ListUpdateActionType.DELETE_ONE:
                if (!action.targetListItem) {
                    throw new Error(
                        "Invalid targetListItem provided for delete"
                    );
                }

                list = list.filter(
                    (listItem: any) =>
                        listItem !==
                        action.targetListItem
                );
                break;
            case ListUpdateActionType.DELETE_LAST:
                list = list.slice(0, -1);
                break;
            case ListUpdateActionType.ADD:
                if (!action.targetListItem) {
                    throw new Error(
                        "Invalid targetListItem provided for add"
                    );
                }
                list = list.concat([
                    action.targetListItem,
                ]);
                break;
            default:
                throw new Error(
                    "Unacceptable UpdateType"
                );
        }
        return list;
    };

    const [list, dispatch] = useReducer<
        (
            list: T[],
            action: ListUpdateAction<T>
        ) => T[]
    >(reducer, initialList);

    return [list, dispatch];
}

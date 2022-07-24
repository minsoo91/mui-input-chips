import {
    Autocomplete,
    AutocompleteRenderInputParams,
    Box,
    Chip,
    TextField,
} from "@mui/material";
import React, {
    SyntheticEvent,
    useState,
} from "react";
import { DeleteOutlined } from "@mui/icons-material";
import useListReducer, {
    ListUpdateActionType,
} from "../hooks/useListReducer";

type ObjectOption = {
    id: number;
    label: string;
};
type InputChipsProps = {
    availableOptions: ObjectOption[];
};
export default function InputChips({
    availableOptions,
}: InputChipsProps) {
    const [options, dispatch] =
        useListReducer<ObjectOption>([]);
    const [inputValue, setInputValue] =
        useState("");
    const [value, setValue] = useState(null);

    const handleDelete =
        (opt: ObjectOption) =>
        (e: SyntheticEvent) => {
            e.preventDefault();
            dispatch({
                type: ListUpdateActionType.DELETE_ONE,
                targetListItem: opt,
            });
        };

    const handleInputChange = (
        e: React.SyntheticEvent<Element, Event>,
        value: string
    ) => {
        e.preventDefault();
        setInputValue(value);
    };

    const handleValueChange = (
        e: React.SyntheticEvent<Element, Event>,
        value: ObjectOption | null
    ) => {
        console.log(value);
        if (!value) return;

        dispatch({
            type: ListUpdateActionType.ADD,
            targetListItem: value,
        });
        // better than empty string because isOptionEqualToValue equality check won't run on null value
        setValue(null);
        setInputValue("");
    };

    const handleKeyDown = (
        e: React.KeyboardEvent
    ) => {
        if (
            e.key === "Backspace" ||
            e.key === "Delete"
        ) {
            if (inputValue === "") {
                dispatch({
                    type: ListUpdateActionType.DELETE_LAST,
                });
            }
        }
    };

    return (
        <Box>
            <Autocomplete
                autoHighlight
                disablePortal
                inputValue={inputValue}
                onInputChange={handleInputChange}
                value={value}
                onChange={handleValueChange}
                renderInput={(
                    params: AutocompleteRenderInputParams
                ) => {
                    params.InputProps.startAdornment =
                        options.map(
                            (
                                option: ObjectOption
                            ) => (
                                <Chip
                                    key={
                                        option.id
                                    }
                                    label={
                                        option.label
                                    }
                                    onDelete={handleDelete(
                                        option
                                    )}
                                    deleteIcon={
                                        <DeleteOutlined />
                                    }
                                    color="primary"
                                />
                            )
                        );
                    return (
                        <TextField
                            {...params}
                            variant="outlined"
                            onKeyDown={
                                handleKeyDown
                            }
                        />
                    );
                }}
                options={availableOptions.filter(
                    (availableOptions) =>
                        !options.find(
                            (option) =>
                                option.label ===
                                availableOptions.label
                        )
                )}
            />
        </Box>
    );
}

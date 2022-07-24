import type { NextPage } from "next";

import { Box, styled } from "@mui/material";
import React from "react";
import InputChips from "../components/InputChips";

const Container = styled(Box)({});
type ObjectOption = {
    id: number;
    label: string;
};
const Home: NextPage = () => {
    const availableOptions: ObjectOption[] = [
        { id: 1, label: "Iron Man" },
        { id: 2, label: "Captain America" },
        { id: 3, label: "Dr. Strange" },
        { id: 4, label: "Spiderman" },
        { id: 5, label: "Scarlet Witch" },
    ];
    return (
        <Container>
            <InputChips
                availableOptions={
                    availableOptions
                }
            />
        </Container>
    );
};

export default Home;

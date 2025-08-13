import React from "react";
import { InfoOutlined, Error } from '@mui/icons-material'; // Icons
import { Box, Link, Stack, Typography, FormHelperText } from '@mui/joy'; // Joy components

interface HelperTextProps {
    name?: string;
    error: string | boolean | undefined;
    helperText: string | undefined;
    errorText: string | undefined;
    link?: {
        label: string;
        url: string;
    };
}

export const HelperText: React.FC<HelperTextProps> = ({ error, helperText,
    errorText, link, name }) => {

    return (
        <FormHelperText data-test={`form-helper-text-${name || "unassigned"}`}>
            <Box style={{
                display: "flex",
                alignItems: "center",
            }}>
                {error ? (
                    <Stack flexDirection={"row"} alignItems={"center"} data-test={`error-text-group`}>
                        <Error data-test={`error-text-icon`} color="error" sx={{ width: "18px", marginRight: "7px" }} />
                        <Typography data-test={`error-text-val`} level="body-xs" color="danger">{errorText}</Typography>
                    </Stack>
                ) : (helperText &&
                    <Stack flexDirection={"row"} alignItems={"center"} data-test={`helper-text-group`}>
                        <InfoOutlined data-test={`helper-text-icon`} sx={{ width: "18px", marginRight: "7px" }} />
                        <Typography data-test={`helper-text-val`}
                            level="body-xs" color="neutral">{helperText}</Typography>
                        {link && <Link sx={{ ml: "7px" }} href={link?.url} >{link?.label}.</Link>}
                    </Stack>
                )}
            </Box>
        </FormHelperText>
    )
}
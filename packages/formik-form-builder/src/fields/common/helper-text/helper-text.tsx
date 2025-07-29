import React from "react";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import Box from "@mui/joy/Box";
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import FormHelperText from '@mui/joy/FormHelperText';

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
                        <ErrorIcon data-test={`error-text-icon`} color="error" sx={{ width: "18px", marginRight: "7px" }} />
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
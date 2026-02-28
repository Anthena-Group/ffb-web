import React from "react";
import { 
  Box, IconButton, Input, Select, Option, Stack, 
  Typography, Tooltip, Divider 
} from "@mui/joy";
import { ConditionName, PostCondition } from "formik-form-builder";
import { Trash2, Hash, Braces, ChevronDown } from "lucide-react";
import { conditionNameList } from "../constants";
import type { LogicRowProps } from "../types";

export const LogicRow = React.memo(({
  logic,
  groupIndex,
  logicIndex,
  updateLogic,
  deleteLogic,
  disableDelete,
}: LogicRowProps) => {
  return (
    <Box 
      sx={{ 
        p: 1, 
        borderRadius: "md", 
        bgcolor: "transparent",
        transition: "0.2s",
        position: 'relative',
        "&:hover": { 
          bgcolor: "background.level1",
          "& .delete-btn": { opacity: 1 } 
        }
      }}
    >
      <Stack spacing={1}>
        {/* Top Row: Field and Condition */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Input
            size="sm"
            variant="plain"
            placeholder="Field Key"
            value={logic.field}
            startDecorator={<Braces size={14} color="var(--joy-palette-primary-main)" />}
            onChange={(e) => updateLogic(groupIndex, logicIndex, "field", e.target.value)}
            sx={{ 
              flex: 1, 
              fontWeight: 600,
              bgcolor: 'background.surface',
              boxShadow: 'sm',
              '--Input-focusedThickness': '1px'
            }}
          />

          <Select
            size="sm"
            variant="soft"
            color="neutral"
            indicator={<ChevronDown size={14} />}
            value={logic.condition}
            onChange={(_, val) => updateLogic(groupIndex, logicIndex, "condition", val as ConditionName)}
            sx={{ 
              minWidth: 80,
              fontWeight: 700,
              fontSize: 'xs'
            }}
          >
            {conditionNameList.map((c) => (
              <Option key={c.value} value={c.value} sx={{ fontSize: 'xs' }}>
                <Typography sx={{ fontWeight: 'bold', mr: 1 }}>{c.sign}</Typography>
                <Typography level="body-xs" sx={{ opacity: 0.6 }}>{c.value}</Typography>
              </Option>
            ))}
          </Select>
        </Stack>

        {/* Bottom Row: Value and Chain Logic */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Input
            size="sm"
            variant="plain"
            placeholder="Value"
            value={logic.value as string}
            startDecorator={<Hash size={14} />}
            onChange={(e) => updateLogic(groupIndex, logicIndex, "value", e.target.value)}
            sx={{ 
              flex: 1,
              fontSize: 'xs',
              bgcolor: 'background.surface',
              border: '1px solid',
              borderColor: 'neutral.outlineBorder'
            }}
          />

          <Divider orientation="vertical" sx={{ height: 20 }} />

          <Select
            size="sm"
            variant="plain"
            color="primary"
            value={logic.postCondition}
            onChange={(_, val) => updateLogic(groupIndex, logicIndex, "postCondition", val as PostCondition)}
            sx={{ 
              minWidth: 70, 
              fontSize: 'xs', 
              fontWeight: 800,
              color: 'primary.solidBg',
              textTransform: 'uppercase',
              '&:hover': { bgcolor: 'primary.softBg' }
            }}
          >
            {Object.values(PostCondition).map((p) => (
              <Option key={p} value={p} sx={{ fontSize: 'xs' }}>{p}</Option>
            ))}
          </Select>

          <IconButton
            className="delete-btn"
            size="sm"
            variant="plain"
            color="danger"
            onClick={() => deleteLogic(groupIndex, logicIndex)}
            disabled={disableDelete}
            sx={{ 
                opacity: { xs: 1, md: 0 }, 
                transition: '0.2s',
                '--IconButton-size': '28px' 
            }}
          >
            <Trash2 size={14} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
});
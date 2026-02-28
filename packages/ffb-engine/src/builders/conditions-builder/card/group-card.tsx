import React from "react";
import { 
  Box, Button, IconButton, Select, Option, Stack, 
  Typography, Sheet, Divider 
} from "@mui/joy";
import { Trash2, Plus, Layers, ChevronDown } from "lucide-react";
import type { GroupCardProps } from "../types";
import { PostCondition } from "formik-form-builder";
import { LogicRow } from "./logic-row"; // Assuming LogicRow is in the same folder

export const GroupCard = React.memo(({
  group,
  groupIndex,
  groupsLength,
  updateGroup,
  deleteGroup,
  updateLogic,
  addLogic,
  deleteLogic,
}: GroupCardProps) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Sheet 
        variant="outlined" 
        sx={{ 
          p: 1.5, 
          borderRadius: "xl", 
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          border: "1px solid",
          borderColor: "neutral.outlineBorder",
          background: "var(--joy-palette-background-surface)",
        }}
      >
        <Stack spacing={2}>
          {/* Group Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box 
                sx={{ 
                  display: 'flex', 
                  p: 0.5, 
                  borderRadius: '6px', 
                  bgcolor: 'neutral.softBg', 
                  color: 'neutral.solidBg' 
                }}
              >
                <Layers size={14} />
              </Box>
              <Typography level="title-sm" sx={{ fontWeight: 600, fontSize: 'xs', color: 'neutral.600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Group {groupIndex + 1}
              </Typography>
            </Stack>
            
            <IconButton
              size="sm"
              variant="plain"
              color="danger"
              onClick={() => deleteGroup(groupIndex)}
              disabled={groupsLength === 1}
              sx={{ '--IconButton-size': '28px' }}
            >
              <Trash2 size={16} />
            </IconButton>
          </Stack>

          {/* Logic Rows Container */}
          <Stack 
            spacing={1.5} 
            sx={{ 
              position: 'relative',
              pl: 1,
              ml: 0.5,
              borderLeft: '1px solid',
              borderColor: 'neutral.softOutline'
            }}
          >
            {group.logic.map((logic, logicIndex) => (
              <Box key={logicIndex} sx={{ position: 'relative' }}>
                {/* Visual Branch Hook */}
                <Box sx={{
                  position: 'absolute',
                  left: -8,
                  top: 16,
                  width: 8,
                  height: 1,
                  bgcolor: 'neutral.softOutline'
                }} />
                
                <LogicRow
                  logic={logic}
                  groupIndex={groupIndex}
                  logicIndex={logicIndex}
                  updateLogic={updateLogic}
                  deleteLogic={deleteLogic}
                  disableDelete={group.logic.length === 1}
                />
              </Box>
            ))}
          </Stack>

          {/* Bottom Actions */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ pt: 1 }}>
            <Button
              size="sm"
              variant="soft"
              color="primary"
              startDecorator={<Plus size={14} />}
              onClick={() => addLogic(groupIndex)}
              sx={{ 
                borderRadius: "md", 
                fontSize: 'xs',
                fontWeight: 600,
                py: 0.5,
                px: 1.5
              }}
            >
              Add Rule
            </Button>
            
            <Divider orientation="vertical" sx={{ height: 16, mx: 0.5 }} />

            <Select
              size="sm"
              variant="plain"
              indicator={<ChevronDown size={14} />}
              value={group.groupPostCondition}
              onChange={(_, val) => updateGroup(groupIndex, "groupPostCondition", val as PostCondition)}
              sx={{ 
                fontSize: 'xs', 
                fontWeight: 700,
                color: 'primary.plainColor',
                '&:hover': { bgcolor: 'primary.softBg' }
              }}
            >
              {Object.values(PostCondition).map((c) => (
                <Option key={c} value={c} sx={{ fontSize: 'xs' }}>{c.toUpperCase()}</Option>
              ))}
            </Select>
          </Stack>
        </Stack>
      </Sheet>
    </Box>
  );
});
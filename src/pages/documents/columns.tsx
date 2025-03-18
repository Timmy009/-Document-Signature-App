import { useReducer, useMemo, useCallback } from "react";
import { Text } from "@/components/typography/Text/text";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useMyUploads } from "@/hooks/courses";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

type UploadStatus = "Pending Processing" | "Processed" | "Completed";

export type MyUploadTableData = {
  id: number;
  index: number;
  title: string;
  status: UploadStatus;
  date: string;
  imageUrl: string;
};

type Action =
  | { type: "MARK_COMPLETE"; id: number }
  | { type: "DELETE"; id: number }
  | { type: "SET_DATA"; payload: MyUploadTableData[] };

const reducer = (
  state: MyUploadTableData[],
  action: Action
): MyUploadTableData[] => {
  switch (action.type) {
    case "MARK_COMPLETE":
      return state.map((item) =>
        item.id === action.id ? { ...item, status: "Completed" } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.id);
    case "SET_DATA":
      return action.payload;
    default:
      return state;
  }
};

export const useUploadTable = () => {
  const navigate = useNavigate();
  const { uploads } = useMyUploads({});

  const initialData = useMemo(
    () =>
      uploads.map((upload, index) => ({
        id: upload.id,
        index,
        fileName: upload.fileName,
        fileUrl: upload.fileUrl,
        status: upload.status as UploadStatus,
        date: upload.uploadDate,
        imageUrl: upload.imageUrl,
      })),
    [uploads]
  );

  const [tableData, dispatch] = useReducer(
    reducer,
    initialData as MyUploadTableData[]
  );

  const handleMarkComplete = useCallback((id: number) => {
    dispatch({ type: "MARK_COMPLETE", id });
  }, []);

  const handleDelete = useCallback((id: number) => {
    dispatch({ type: "DELETE", id: id });
  }, []);

  const columns: ColumnDef<MyUploadTableData>[] = [
    {
      accessorKey: "index",
      header: "S/N",
      accessorFn: (originalRow) => originalRow.index + 1,
    },
    {
      accessorKey: "title",
      header: "File Name",
      cell: (props) => {
        const data = props.row.original;
        return (
          <Tooltip>
            <TooltipTrigger asChild className="w-full text-left">
              <div className="flex w-full gap-3 items-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    backgroundImage: `url(${
                      data.imageUrl ?? "src/assets/images/default_course.png"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "0.5rem",
                  }}
                />
                <Text
                  fontSize="text-sm"
                  fontWeight="font-medium"
                  className="truncate"
                >
                  {data.fileName}
                </Text>
              </div>
            </TooltipTrigger>
            <TooltipContent>{data.fileName}</TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (props) => {
        const statusColors: Record<UploadStatus, string> = {
          "Pending Processing": "text-yellow-500",
          Processed: "text-blue-500",
          Completed: "text-green-500",
        };

        return (
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Text
              className={`font-medium ${
                statusColors[props.getValue() as UploadStatus]
              }`}
            >
              {props.getValue()}
            </Text>
          </motion.div>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      accessorFn: (originalRow) =>
        format(originalRow.date ?? undefined, "d LLLL yyyy"),
    },
    {
      accessorKey: "",
      header: "Action",
      cell: (props) => {
        const id = props.row.original.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" asChild>
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownMenuItem
                  onClick={() =>
                    navigate("/upload/view/1", { state: props.row.original })
                  }
                >
                  View Details
                </DropdownMenuItem>
                {props.row.original.status !== "Completed" && (
                  <DropdownMenuItem onClick={() => handleMarkComplete(id)}>
                    Mark Complete
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </DropdownMenuItem>
              </motion.div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { columns, data: tableData };
};

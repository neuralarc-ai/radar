import * as React from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";

export function DatePickerShadcn({ value, onChange, placeholder = "YYYY-MM-DD", className = "" }) {
  const [open, setOpen] = React.useState(false);
  const dateValue = value ? (typeof value === "string" ? parseISO(value) : value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#6C6C6C] bg-[#1C1C1C] text-left text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#302F2F] ${className}`}
        >
          <span className={dateValue ? "" : "text-[#B0B0B0]"}>
            {dateValue ? format(dateValue, "yyyy-MM-dd") : placeholder}
          </span>
          <CalendarIcon className="w-5 h-5 ml-2 text-[#B0B0B0]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[#1C1C1C] border-[#6C6C6C] text-[#FFFFFF]">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={date => {
            setOpen(false);
            if (date) onChange(format(date, "yyyy-MM-dd"));
          }}
          initialFocus
          className="bg-[#1C1C1C] text-[#FFFFFF] border-none"
        />
      </PopoverContent>
    </Popover>
  );
} 
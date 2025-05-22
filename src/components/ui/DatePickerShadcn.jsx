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
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border border-[#000000]/5 border-[1.5px] bg-[#ffffff] text-left text-[#000000] focus:outline-none  ${className}`}
        >
          <span className={dateValue ? "" : "text-[#868686]"}>
            {dateValue ? format(dateValue, "yyyy-MM-dd") : placeholder}
          </span>
          <CalendarIcon className="w-5 h-5 ml-2 text-[#868686]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[#ffffff] border-[#000000]/5 border-[1.5px] text-[#000000]">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={date => {
            setOpen(false);
            if (date) onChange(format(date, "yyyy-MM-dd"));
          }}
          initialFocus
          className="bg-[#ffffff] text-[#000000] border-none"
        />
      </PopoverContent>
    </Popover>
  );
} 
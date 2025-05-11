import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { addMonths, subMonths, format, isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isToday, isWithinInterval, isAfter, isBefore } from "date-fns"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function Calendar({
  selected,
  onSelect,
  mode = "single",
  initialFocus = false,
  className = "",
}) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date())
  const [focusedDate, setFocusedDate] = React.useState(selected || new Date())

  React.useEffect(() => {
    if (initialFocus && selected) {
      setFocusedDate(selected)
      setCurrentMonth(selected)
    }
  }, [initialFocus, selected])

  const startMonth = startOfMonth(currentMonth)
  const endMonth = endOfMonth(currentMonth)
  const startDate = startOfWeek(startMonth)
  const endDate = endOfWeek(endMonth)

  const weeks = []
  let day = startDate
  while (day <= endDate) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(day)
      day = addDays(day, 1)
    }
    weeks.push(week)
  }

  function handleDayClick(day) {
    if (mode === "single") {
      onSelect && onSelect(day)
    }
  }

  return (
    <div className={`p-4 rounded-lg bg-[#1C1C1C] text-[#FFFFFF] ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 rounded hover:bg-[#302F2F]"
        >
          <ChevronLeftIcon className="w-5 h-5 text-[#B0B0B0]" />
        </button>
        <span className="font-semibold text-lg">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 rounded hover:bg-[#302F2F]"
        >
          <ChevronRightIcon className="w-5 h-5 text-[#B0B0B0]" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-xs font-semibold text-[#B0B0B0] text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.map((week, i) =>
          week.map((day, j) => {
            const isSelected = selected && isSameDay(day, selected)
            const isCurrentMonth = isSameMonth(day, currentMonth)
            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => handleDayClick(day)}
                className={classNames(
                  "w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors",
                  isSelected
                    ? "bg-[#302F2F] text-[#FFFFFF]"
                    : isToday(day)
                    ? "border border-[#302F2F] bg-[#1C1C1C] text-[#FFFFFF]"
                    : isCurrentMonth
                    ? "text-[#FFFFFF] hover:bg-[#6C6C6C]"
                    : "text-[#6C6C6C]",
                  !isCurrentMonth && "opacity-50"
                )}
                tabIndex={isSelected ? 0 : -1}
              >
                {format(day, "d")}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
} 
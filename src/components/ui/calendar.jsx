import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { addMonths, subMonths, format, isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isToday } from "date-fns"

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
    <div className={`p-4 rounded-lg bg-[#ffffff] text-[#000000] ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-1 rounded hover:bg-[#E8E8E8]"
        >
          <ChevronLeftIcon className="w-5 h-5 text-[#868686]" />
        </button>
        <span className="font-semibold text-lg text-[#000000]">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-1 rounded hover:bg-[#E8E8E8]"
        >
          <ChevronRightIcon className="w-5 h-5 text-[#868686]" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-xs font-semibold text-[#868686] text-center">
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
                    ? "bg-[#E8E8E8] text-[#000000]"
                    : isToday(day)
                    ? "border border-[#000000]/5 bg-[#ffffff] text-[#000000]"
                    : isCurrentMonth
                    ? "text-[#000000] hover:bg-[#E8E8E8]"
                    : "text-[#868686]",
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
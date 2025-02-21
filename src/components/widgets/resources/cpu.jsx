import useSWR from "swr";
import { FiCpu } from "react-icons/fi";
import { BiError } from "react-icons/bi";
import { useTranslation } from "react-i18next";

export default function Cpu() {
  const { t } = useTranslation();

  const { data, error } = useSWR(`/api/widgets/resources?type=cpu`, {
    refreshInterval: 1500,
  });

  if (error || data?.error) {
    return (
      <div className="flex-none flex flex-row items-center justify-center">
        <BiError className="text-theme-800 dark:text-theme-200 w-5 h-5" />
        <div className="flex flex-col ml-3 text-left">
          <span className="text-theme-800 dark:text-theme-200 text-xs">{t("widget.api_error")}</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-none flex flex-row items-center justify-center">
        <FiCpu className="text-theme-800 dark:text-theme-200 w-5 h-5" />
        <div className="flex flex-col ml-3 text-left">
          <span className="text-theme-800 dark:text-theme-200 text-xs">-</span>
        </div>
      </div>
    );
  }

  const percent = data.cpu.usage;

  return (
    <div className="flex-none flex flex-row items-center justify-center">
      <FiCpu className="text-theme-800 dark:text-theme-200 w-5 h-5" />
      <div className="flex flex-col ml-3 text-left font-mono min-w-[50px]">
        <div className="text-theme-800 dark:text-theme-200 text-xs">
          {t("common.number", { value: data.cpu.usage, style: "unit", unit: "percent", maximumFractionDigits: 0 })}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
          <div
            className="bg-theme-600 h-1 rounded-full dark:bg-theme-500"
            style={{
              width: `${percent}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

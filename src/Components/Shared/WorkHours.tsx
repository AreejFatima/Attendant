import { useState, useEffect } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { recordType } from "../../Adapter/types";
import GraphicalTabs from "./GraphicalTabs";
import HourlyTabs from "./HourlyTabs";

const R = require("ramda");

const WorkHours = ({ id, role, type }) => {
  let recordsList: recordType;
  if (role === "user") {
    recordsList = useSelector(
      (state: RootStateOrAny) => state.user.userRecords
    );
  } else {
    recordsList = useSelector((state: RootStateOrAny) => state.admin.records);
  }

  const [userRecords, setUserRecords] = useState([]);
  let weeklyRecords = [];
  let dailyRecords = [];
  let monthlyRecords = [];
  const dailylabels = [];
  const dailydata = [];
  const weeklylabels = [];
  const weeklydata = [];
  const monthlylabels = [];
  const monthlydata = [];

  useEffect(() => {
    const recordObject = R.find(R.propEq("id", id))(recordsList);
    setUserRecords(recordObject.Records);
  }, []);
  const byDate = R.groupBy((record) => record.date);

  function recordsByDate(): void {
    const tempRec = [];
    if (userRecords) {
      const temp = byDate(userRecords);
      Object.entries(temp).map(([k, v]) => {
        let sum = 0;
        R.map((x) => {
          sum += x.workHours;
        }, v);
        const temp2 = {
          date: k,
          WorkHours: sum,
        };
        tempRec.push(temp2);
      });
      dailyRecords = tempRec;
    }
  }
  recordsByDate();

  function dailyChartData() {
    let obj;
    if (dailyRecords) {
      R.map((item) => {
        dailylabels.push(item.date);
        dailydata.push(item.WorkHours);
      }, dailyRecords);
      obj = {
        labels: dailylabels,
        datasets: [
          {
            label: "Daily Work Hours",
            colors: "rgba(245, 194, 66, 0.75)",
            backgroundColor: "rgba(34, 109, 164, 0.8)",
            data: dailydata,
          },
        ],
      };
    }
    return obj;
  }

  function weeklyMonthlyChartData(recType) {
    let obj;
    if (recType === "week" && !R.isEmpty(weeklyRecords)) {
      R.map((item) => {
        weeklylabels.push(item.date);
        weeklydata.push(item.WorkHours);
      }, weeklyRecords);
      obj = {
        labels: weeklylabels,
        datasets: [
          {
            label: "Weekly Work Hours",
            colors: "rgba(245, 194, 66, 0.75)",
            backgroundColor: "rgba(220, 168, 36, 0.8)",
            data: weeklydata,
          },
        ],
      };
    } else if (recType === "month" && !R.isEmpty(monthlyRecords)) {
      R.map((item) => {
        monthlylabels.push(item.date);
        monthlydata.push(item.WorkHours);
      }, monthlyRecords);
      obj = {
        labels: monthlylabels,
        datasets: [
          {
            label: "Monthly Work Hours",
            colors: "rgba(132, 40, 145, 0.8)",
            backgroundColor: "rgba(132, 40, 145, 0.8)",
            data: monthlydata,
          },
        ],
      };
    }
    return obj;
  }
  function incrementDate(d, n): string {
    const date = Date.parse(d);
    const current = new Date(date);
    current.setDate(current.getDate() + n);
    const finalDate = `${
      current.getMonth() + 1
    }/${current.getDate()}/${current.getFullYear()}`;
    return finalDate;
  }

  function calculateWeeklyMonthlyHours(n) {
    if (!R.isEmpty(dailyRecords)) {
      if (dailyRecords.length > 1) {
        const tempWeek = [];
        let startDate = dailyRecords[1].date;
        let endDate;
        let sum = 0;
        const dailyLength = dailyRecords.length - 1;

        for (let i = 1; i < dailyLength; i += 1) {
          if (
            Date.parse(endDate) >= Date.parse(dailyRecords[dailyLength].date)
          ) {
            break;
          }
          endDate = incrementDate(startDate, n);
          while (
            Date.parse(dailyRecords[i].date) < Date.parse(endDate) &&
            Date.parse(endDate) <= Date.parse(dailyRecords[dailyLength].date)
          ) {
            sum += dailyRecords[i].WorkHours;
            i += 1;
          }
          sum += dailyRecords[i].WorkHours;
          const temp = {
            date: `${startDate}-${endDate}`,
            WorkHours: sum,
          };
          tempWeek.push(temp);
          sum = 0;
          startDate = incrementDate(endDate, 1);
        }
        if (n >= 20) {
          monthlyRecords = tempWeek;
        } else {
          weeklyRecords = tempWeek;
        }
      }
    }
  }
  calculateWeeklyMonthlyHours(4);
  calculateWeeklyMonthlyHours(20);
  return (
    <div>
      {type === "graphical" ? (
        <GraphicalTabs
          daily={dailyChartData}
          weekly={() => weeklyMonthlyChartData("week")}
          monthly={() => weeklyMonthlyChartData("month")}
        />
      ) : (
        <HourlyTabs weekly={weeklyRecords} monthly={monthlyRecords} />
      )}
    </div>
  );
};

export default WorkHours;

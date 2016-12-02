import React from 'react';
import moment from 'moment';
import calendar from '@philipyoungg/calendar';

// utils

const inArray = (arr, test) => {
  if (arr.indexOf(test) >= 0) {
    return true;
  }
  return false;
};

const Event = () => (
  <div className="event" />
);

const Day = ({ day, hasEvent }) => {
  const whiteClass = day === 0 ? 'white' : '';
  const className = `day ${whiteClass}`;
  return (
    <div className={className}>
    {day}
    {hasEvent ? <Event /> : ''}
    </div>
  );
};

const DayName = ({ day }) => (
  <div className="day">{day}</div>
);

const WeekHeader = ({ dayName }) => (
  <div className="week-header">
     {
      dayName.map(d => <DayName key={d} day={moment(d, 'e').format('ddd')} />)
     }
  </div>
);

const Week = ({ weeks, events }) => (
  <div className="week">
    {weeks.map((d, i) =>
      <Day key={i} day={d} hasEvent={inArray(events, d)} />
    )}
  </div>
);

const Month = ({ months, monthName, yearName, dayNumber, events }) => (
  <div className="inline">
    <h2>{moment(monthName, 'M').format('MMMM')} {yearName}</h2>
    <div className="month">
      <WeekHeader dayName={dayNumber} />
      {months.map((w, i) =>
        <Week key={i} weeks={w} events={events} />
      )}
    </div>
  </div>
);

class MonthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthName: Number(moment().format('M')),
      yearName: Number(moment().format('YYYY')),
      events: [2, 3, 20],
    };
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
  }
  nextMonth() {
    const { monthName, yearName } = this.state;
    if (monthName >= 12) {
      this.setState({
        monthName: 1,
        yearName: yearName + 1,
      });
    } else {
      this.setState({
        monthName: monthName + 1,
      });
    }
  }

  previousMonth() {
    const { monthName, yearName } = this.state;
    if (monthName <= 1) {
      this.setState({
        monthName: 11,
        yearName: yearName - 1,
      });
    } else {
      this.setState({
        monthName: monthName - 1,
      });
    }
  }

  render() {
    const { monthName, yearName, events } = this.state;
    const { nextMonth, previousMonth } = this;
    const computedMonth = calendar({ month: monthName, year: yearName });
    return (
      <div>
        <Month
          months={computedMonth.data}
          monthName={monthName}
          yearName={yearName}
          dayNumber={computedMonth.dayNumber}
          events={events}
        />
        <button onClick={previousMonth}>prev Month</button>
        <button onClick={nextMonth}>next Month</button>
      </div>
    );
  }
}

const Year = ({ events }) => {
  const component = [];
  const yearName = new Date().getFullYear();
  for (let i = 1; i <= 12; i++) {
    component.push(<Month months={calendar({ month: i }).data} events={events} monthName={i} yearName={yearName} key={i} />);
  }
  return (
    <div className="year">
      <h1>Year of {yearName}</h1>
      {component}
    </div>
  );
};

export default MonthContainer;

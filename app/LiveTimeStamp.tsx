"use client";
// import TimeAgo from "react-timeago";

type Props = {
  time: string;
};

function LiveTimeStamp({ time }: Props) {
  return <div date={time} />;
}

export default LiveTimeStamp;

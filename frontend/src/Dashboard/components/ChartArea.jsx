import { Bar } from "react-chartjs-2";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./ChartArea.css";
const ChartArea = () => {
  const downloadDays = useSelector(
    (state) => state.dashboard.data.botWorkingData
  );
  const reversedData = [].concat(downloadDays).reverse();
  const data = {
    labels: reversedData.map((day) => day.date),
    datasets: [
      {
        label: "downloads",
        data: reversedData.map((day) => day.download),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <Container fluid className="bg-light p-3 chart__area order-1">
      <h5 className="text-dark">Last 7 day Downloads</h5>
      <Bar data={data} options={options} />
    </Container>
  );
};

export default ChartArea;

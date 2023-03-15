import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement, CategoryScale, LinearScale, PointElement
} from 'chart.js'

ChartJS.register(
    LineElement, CategoryScale, LinearScale, PointElement
)

function Graph() {
    const data = {
        labels: ["March 7", "March 8", "March 9", "March 10", "March 11", "March 12", "March 13"],
        datasets: [{
            data: [120, 130, 166, 175, 190, 210]
        }]
    };
    const options = {};

    return (
        <div>
            <Line data={data} options={options}></Line>
        </div>
    );
}

export default Graph;
import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
    scenarios: {
        shared_iter_scenario: {
            executor: "shared-iterations",
            vus: 1000,
            iterations: 3500,
            gracefulStop: "2s",
        },
    },
};

export default function () {
    const res = http.post("https://reqres.in/api/users");
    const payload = JSON.stringify({
        name : "morpheus",
        job : "leader",
    });

    const params = {
        headers: {
            "Content-Type" : "application/json",
        },
    };

    const checkOutput = check(
        res,
        {
            "response code was 201": (res) => res.status == 201,
        },
    );
}

export function handleSummary(data) {
    return {
      "report_perform_post_morpheus.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
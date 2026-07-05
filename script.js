const strategyData = {
  primitive: {
    label: "Primitive contraction",
    title: "Local rule application",
    summary: "Each emitted action exactly matches a primitive grammar rule.",
    trace: ["dffae", "bae", "bc", "a"],
    rules: [
      ["primitive rule", "dff -> b"],
      ["primitive rule", "ae -> c"],
      ["primitive rule", "bc -> a"],
    ],
  },
  macro: {
    label: "Macro / derived contraction",
    title: "Sequential composition compressed into one action",
    summary:
      "A non-primitive rewrite stands in for an ordered chain of primitive contractions.",
    trace: ["dffae", "bae", "a"],
    rules: [
      ["visible action", "bae -> a"],
      ["hidden chain", "ae -> c, bc -> a"],
      ["reused chunk", "multi-step shortcut"],
    ],
  },
  parallel: {
    label: "Parallel contraction",
    title: "Independent primitive contractions in the same emitted step",
    summary:
      "A single emitted action contracts disjoint substrings simultaneously before the trace continues.",
    trace: ["dffae", "bc", "a"],
    rules: [
      ["same step", "dff -> b"],
      ["same step", "ae -> c"],
      ["next step", "bc -> a"],
    ],
  },
};

const tabs = Array.from(document.querySelectorAll(".strategy-tab"));
const detail = {
  label: document.querySelector("#strategy-label"),
  title: document.querySelector("#strategy-title"),
  summary: document.querySelector("#strategy-summary"),
  trace: document.querySelector("#trace-row"),
  rules: document.querySelector("#rule-stack"),
};

function renderStrategy(key) {
  const data = strategyData[key];
  detail.label.textContent = data.label;
  detail.title.textContent = data.title;
  detail.summary.textContent = data.summary;

  detail.trace.replaceChildren();
  data.trace.forEach((token, index) => {
    const tokenElement = document.createElement("span");
    tokenElement.className = "trace-token";
    tokenElement.textContent = token;
    detail.trace.append(tokenElement);

    if (index < data.trace.length - 1) {
      const arrow = document.createElement("span");
      arrow.className = "trace-arrow";
      arrow.textContent = "->";
      detail.trace.append(arrow);
    }
  });

  detail.rules.replaceChildren();
  data.rules.forEach(([label, rule]) => {
    const row = document.createElement("div");
    row.className = "rule-pill";

    const labelElement = document.createElement("span");
    labelElement.textContent = label;

    const ruleElement = document.createElement("code");
    ruleElement.textContent = rule;

    row.append(labelElement, ruleElement);
    detail.rules.append(row);
  });

  tabs.forEach((tab) => {
    const active = tab.dataset.strategy === key;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => renderStrategy(tab.dataset.strategy));
});

renderStrategy("primitive");

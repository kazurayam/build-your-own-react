let nextUnitOfWork_example = null;
const tasks = [
  "タスク 1: 卵を買う",
  "タスク 2: 牛乳を買う",
  "タスク 3: パンを買う",
  "タスク 4: Reactの勉強をする",
  "タスク 5: workLoopの仕組みを理解する",
  "タスク 6: 散歩に行く",
  "タスク 7: 夕食を作る",
  "タスク 8: 映画を見る",
  "タスク 9: 歯を磨く",
  "タスク 10: 寝る",
];
let currentTaskIndex = 0;

const taskListElement = document.getElementById("taskList");
const startButton = document.getElementById("startButton");

function performUnitOfWork_example(unitOfWork) {
  if (!unitOfWork || unitOfWork.taskIndex >= tasks.length) {
    console.log("全てのタスクが完了しました！");
    return null;
  }

  const taskText = tasks[unitOfWork.taskIndex];
  console.log(`処理中: ${taskText} (インデックス: ${unitOfWork.taskIndex})`);

  const listItem = document.createElement("li");
  listItem.textContent = taskText;
  taskListElement.appendChild(listItem);

  return { taskIndex: unitOfWork.taskIndex + 1 };
}
function workLoop_example(deadline) {
  let shouldYield = false;
  console.log(
    `workLoop_example開始。残り時間: ${deadline.timeRemaining().toFixed(2)}ms`
  );

  while (nextUnitOfWork_example && !shouldYield) {
    nextUnitOfWork_example = performUnitOfWork_example(nextUnitOfWork_example);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (nextUnitOfWork_example) {
    console.log(
      `時間切れのため中断。残り時間: ${deadline
        .timeRemaining()
        .toFixed(2)}ms。次のアイドル時に再開します。`
    );
    requestIdleCallback(workLoop_example);
  } else {
    console.log("workLoop_example終了。全てのタスクが処理されました。");
    startButton.disabled = false;
    startButton.textContent = "処理再開 (リストはクリアされます)";
  }
}

startButton.addEventListener("click", () => {
  console.log("処理開始ボタンが押されました。");
  taskListElement.innerHTML = "";
  currentTaskIndex = 0;
  nextUnitOfWork_example = { taskIndex: currentTaskIndex };

  startButton.disabled = true;
  startButton.textContent = "処理中...";

  requestIdleCallback(workLoop_example);
});

import * as vscode from "vscode";

function tabLabelInputToString(a?: vscode.Tab): string {
  return `[${a?.label}, ${JSON.stringify(a?.input)}]`;
}

function isEqualTabLabel(a: vscode.Tab, b: vscode.Tab): boolean {
  return tabLabelInputToString(a) === tabLabelInputToString(b);
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("neovim-helper.showTabGroups", () => {
      console.log("Current tab groups:");
      vscode.window.tabGroups.all.forEach((tabGroup, i) => {
        console.log(`Group #${i}:`);
        tabGroup.tabs.forEach((tab) => {
          console.log("-", tab.input);
        });
      });
    }),
    vscode.commands.registerCommand(
      "neovim-helper.showEditorLayout",
      async () => {
        const layout = await vscode.commands.executeCommand(
          "vscode.getEditorLayout"
        );
        console.log(`Current editor layout: ${JSON.stringify(layout)}`);
      }
    ),
    vscode.commands.registerCommand(
      "neovim-helper.mergeCurrentEditorGroupToSomewhere",
      async () => {
        const layout = await vscode.commands.executeCommand(
          "vscode.getEditorLayout"
        );
        const currentViewColumn =
          vscode.window.tabGroups.activeTabGroup.viewColumn;
        // // workbench.action.focusPreviousGroup
        // // workbench.action.focusNextGroup
        // // workbench.action.moveEditorToPreviousGroup
        // // workbench.action.joinTwoGroups [GroupDirection.RIGHT, GroupDirection.DOWN, GroupDirection.LEFT, GroupDirection.UP]
        // // Try accessing editor group that current editor group will be merged
        // // into. To restore active tab in that group, we need to record the
        // // active tab in that tab group first.
        // const initialViewColumn =
        //   vscode.window.tabGroups.activeTabGroup.viewColumn;
        // console.log(`initial view column: ${initialViewColumn}`);
        // let initialActiveTab: vscode.Tab | undefined;
        // let foundEditorGroup = false;
        // const findingDirections = ["Right", "Below", "Left", "Above"];
        // const findingOppositeDirections = ["Left", "Above", "Right", "Below"];
        // for (let i = 0; i < 4; i++) {
        //   const dir = findingDirections[i];
        //   const oppositeDir = findingOppositeDirections[i];
        //   const command = `workbench.action.focus${dir}Group`;
        //   await vscode.commands.executeCommand(command);
        //   if (
        //     initialViewColumn !==
        //     vscode.window.tabGroups.activeTabGroup.viewColumn
        //   ) {
        //     console.log(
        //       `will be merged to ${dir}: ${vscode.window.tabGroups.activeTabGroup.viewColumn}`
        //     );
        //     // Succeeded to move. Record the active tab.
        //     initialActiveTab = vscode.window.tabGroups.activeTabGroup.activeTab;
        //     console.log(
        //       `initial active editor: ${tabLabelInputToString(
        //         initialActiveTab
        //       )}`
        //     );
        //     const command = `workbench.action.focus${oppositeDir}Group`;
        //     await vscode.commands.executeCommand(command);
        //     console.log(
        //       `focus back to ${dir}: ${vscode.window.tabGroups.activeTabGroup.viewColumn}`
        //     );
        //     foundEditorGroup = true;
        //     break;
        //   }
        // }
        // if (!foundEditorGroup) {
        //   console.log("it seems current view is single one");
        //   return;
        // }
        // await vscode.commands.executeCommand("workbench.action.joinTwoGroups");
        // // Restore original active tab
        // const maxSwitch = vscode.window.tabGroups.all
        //   .map((tabGroup) => tabGroup.tabs.length)
        //   .reduce((sum, numTabs) => sum + numTabs);
        // for (let i = 0; i < maxSwitch; i++) {
        //   const activeTab = vscode.window.tabGroups.activeTabGroup.activeTab;
        //   console.log(
        //     `active tab: (${activeTab?.label}, ${JSON.stringify(
        //       activeTab?.input
        //     )})`
        //   );
        //   if (
        //     tabLabelInputToString(initialActiveTab) ===
        //     tabLabelInputToString(activeTab)
        //   ) {
        //     console.log(`-> found tab`);
        //     break;
        //   }
        //   await vscode.commands.executeCommand("workbench.action.nextEditor");
        // }
        // const activeTab = vscode.window.tabGroups.activeTabGroup.activeTab;
        // console.log(
        //   `restore complete: (${activeTab?.label}, ${JSON.stringify(
        //     activeTab?.input
        //   )})`
        // );
      }
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

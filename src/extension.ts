import * as vscode from "vscode";

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
      "neovim-helper.mergeCurrentEditorGroupToSomewhere",
      async () => {
        // workbench.action.focusPreviousGroup
        // workbench.action.focusNextGroup
        // workbench.action.moveEditorToPreviousGroup
        const currentTabGroup = vscode.window.tabGroups.activeTabGroup;
        await vscode.commands.executeCommand(
          "workbench.action.focusPreviousGroup"
        );
        if (currentTabGroup === vscode.window.tabGroups.activeTabGroup) {
          console.log("There is only one tabgroup.");
          return;
        }

        const previousTabGroup = vscode.window.tabGroups.activeTabGroup;
        const activeTabInPreviousTabGroup = previousTabGroup.activeTab;
        await vscode.commands.executeCommand("workbench.action.focusNextGroup");

        while (vscode.window.tabGroups.activeTabGroup === currentTabGroup) {
          await vscode.commands.executeCommand(
            "workbench.action.moveEditorToPreviousGroup"
          );
        }

        while (
          vscode.window.tabGroups.activeTabGroup.activeTab?.label !==
          activeTabInPreviousTabGroup?.label
        ) {
          await vscode.commands.executeCommand("workbench.action.nextEditor");
        }
      }
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}

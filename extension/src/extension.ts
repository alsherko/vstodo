// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWordPanel';
import { SidebarProvider } from './SidebarProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);

	const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
	item.text = "$(beaker) Add Todo";
	item.command = "vstodo.addTodo";
	item.show();

	context.subscriptions.push(
	  vscode.window.registerWebviewViewProvider(
		"vstodo-sidebar",
		sidebarProvider
	  )
	);

	context.subscriptions.push(vscode.commands.registerCommand('vstodo.helloWorld', () => {
		console.log(context.extensionUri)
		HelloWorldPanel.createOrShow(context.extensionUri)
	}))

	context.subscriptions.push(vscode.commands.registerCommand('vstodo.addTodo', () => {
		const {activeTextEditor} = vscode.window

		if(!activeTextEditor) {
			vscode.window.showInformationMessage("No active text editor");
			return;
		}
		
		const text = activeTextEditor.document.getText(activeTextEditor.selection)
		sidebarProvider._view?.webview.postMessage({
			type: 'new-todo', 
			value: text,
		})
					
	}))

	context.subscriptions.push(vscode.commands.registerCommand('vstodo.refresh', async () => {
		// HelloWorldPanel.kill()
		// HelloWorldPanel.createOrShow(context.extensionUri)

		await vscode.commands.executeCommand("workbench.action.closeSidebar")
		await vscode.commands.executeCommand("workbench.view.extension.vstodo-sidebar-view")

		// setTimeout(() => { 
		// 	vscode.commands.executeCommand(
		// 		'workbench.action.webview.openDeveloperTools'
		// 	)
		// }, 500);
	}))

	context.subscriptions.push(vscode.commands.registerCommand("vstodo.askQuastion", async () => {
		const answer = await vscode.window.showInformationMessage(
			"How was your day?",
			"good",
			"bad"
		);

		if (answer === 'bad') {
			vscode.window.showInformationMessage("Sorry to hear that")
		} else {
			console.log(answer)
		}
	}))
}

// this method is called when your extension is deactivated
export function deactivate() { }

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorldPanel } from './HelloWordPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vstodo" is now active!');

	context.subscriptions.push(vscode.commands.registerCommand('vstodo.helloWorld', () => {
		console.log(context.extensionUri)
		HelloWorldPanel.createOrShow(context.extensionUri)
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

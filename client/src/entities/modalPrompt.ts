import { PromptEnums } from './promptEnums';

export interface ModalPrompt {
	type: PromptEnums;
	headerText: string;
	message: string;
	positiveButton?: modalPromptButton;
	negativeButton?: modalPromptButton;
	showModal: modalShowState;
}

interface modalPromptButton {
	name: string;
	action: any;
}

interface modalShowState {
	set: any;
	get: any;
}

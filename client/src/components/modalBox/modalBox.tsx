import { ModalPrompt } from '../../entities/modalPrompt';
import './modalBox.css';

export const ModalBoxComponent = (props: any) => {
	const promptInfo: ModalPrompt = props.prompt;

	const toggleModalBox = () => {
		promptInfo.showModal.set(!promptInfo.showModal.get);
	};
	const handleNegativeAction = () => {
		if (promptInfo && promptInfo.negativeButton) {
			promptInfo.negativeButton.action();
		}
		toggleModalBox();
	};
	const handlePositiveAction = () => {
		if (promptInfo && promptInfo.positiveButton) {
			promptInfo.positiveButton.action();
		}
		toggleModalBox();
	};
	return (
		<div
			id='modal-wrapper'
			className={`${
				promptInfo.showModal.get ? 'showModal' : 'hideModal'
			}`}
		>
			<div className={`row ${promptInfo.type}`} id='modal-content'>
				<div className='col-12' id='prompt-header'>
					<h3>{promptInfo.headerText} </h3>
				</div>
				<div className='col-12'>
					<hr className='rounded'></hr>
				</div>
				<div className='col-12' id='prompt-body'>
					<p>{promptInfo.message}</p>
				</div>
				<div className='col-12' id='prompt-footer'>
					<div className='row'>
						<div className='col-8'>
							<button
								className='standard-button'
								onClick={toggleModalBox}
							>
								stäng
							</button>
						</div>

						<div className='col-4'>
							<div className='action-buttons-wrapper'>
								{promptInfo.negativeButton && (
									<div className='col-6'>
										<button
											className='remove-button'
											onClick={handleNegativeAction}
										>
											{promptInfo.negativeButton.name}
										</button>
									</div>
								)}
								{promptInfo.positiveButton && (
									<div className='col-6'>
										<button
											className='add-button'
											onClick={handlePositiveAction}
										>
											{promptInfo.positiveButton.name}
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

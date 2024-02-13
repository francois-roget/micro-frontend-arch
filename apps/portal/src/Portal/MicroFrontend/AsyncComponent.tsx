import React, { ComponentType } from 'react';
import { MicroFrontendProps } from '../../types.ts';
import { getMFEDefinition } from '../../services/ModuleService.ts';

type Props = {
	url: string;
	name: string;
	fileName: string;
};

type State = {
	LoadedComponent?: ComponentType<MicroFrontendProps>;
	error?: Error;
};

class AsyncComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			LoadedComponent: undefined,
		};
	}

	async componentDidMount(): Promise<void> {
		const { url, fileName, name } = this.props;
		const { LoadedComponent } = this.state;
		if (!LoadedComponent) {
			try {
				const loadedModule = await getMFEDefinition(
					url,
					fileName,
					name
				);
				this.setState({
					LoadedComponent: loadedModule.mainComponent,
					error: undefined,
				});
			} catch (e) {
				this.setState({
					LoadedComponent: undefined,
					error: e as Error,
				});
			}
		}
	}

	render(): JSX.Element | undefined {
		const { name } = this.props;
		const { LoadedComponent, error } = this.state;
		if (error) {
			return <div>Error loading the microfrontend: {error.message}</div>;
		}
		return LoadedComponent && <LoadedComponent name={name} />;
	}
}

export default AsyncComponent;

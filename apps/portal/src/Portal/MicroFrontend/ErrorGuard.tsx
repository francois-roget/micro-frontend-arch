import * as React from 'react';
import { PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren;
type State = {
	error?: Error;
	errorInfo?: React.ErrorInfo;
};

// eslint-disable-next-line react/prefer-stateless-function
class ErrorGuard extends React.Component<Props, State> {
	constructor(props: PropsWithChildren) {
		super(props);
		this.state = {};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		this.setState({ error, errorInfo });
	}

	render(): JSX.Element | ReactNode {
		const { children } = this.props;
		const { error, errorInfo } = this.state;
		if (error) {
			return (
				<div>
					An error occured: {error.message}
					<pre style={{ fontSize: '9pt' }}>
						{errorInfo?.componentStack}
					</pre>
				</div>
			);
		}
		return children;
	}
}

export default ErrorGuard;

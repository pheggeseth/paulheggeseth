import './footer.css';

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer">
			<div aria-label={`Copyright ${currentYear} Paul Heggeseth`}>
				copyright({currentYear}) Paul.Heggeseth
			</div>
		</footer>
	);
}

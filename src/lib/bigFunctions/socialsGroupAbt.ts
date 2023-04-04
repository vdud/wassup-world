import { currentPageHeaderData } from '$lib/stores/currentPageHeaderData';
import { userName } from '$lib/stores/userName';

export const copyLink = () => {
	navigator.clipboard.writeText(window.location.href);
	userName.subscribe((name) => {
		if (name) {
			alert(`HEY ${name.toUpperCase()}! the link has been copied to your clipboard`);
		}
	});
};

export const shareViaEmail = () => {
	userName.subscribe((name) => {
		if (name) {
			currentPageHeaderData.subscribe((data) => {
				if (data) {
					const subject = encodeURIComponent(`Check out this group: ${data}`);
					const body = encodeURIComponent(`Heyy! it's ${name}, I thought you might be interested in this group: ${data}: ${window.location.href}`);
					window.open(`mailto:?subject=${subject}&body=${body}`);
				}
			});
		}
	});
};

export const shareViaWhatsApp = () => {
	userName.subscribe((name) => {
		if (name) {
			currentPageHeaderData.subscribe((data) => {
				if (data) {
					const text = encodeURIComponent(`Hello! It's ${name} here! Don't miss out on our exciting group chat at ${data} on Wassup World. Join us now by clicking this link: ${window.location.href}`);
					window.open(`https://api.whatsapp.com/send?text=${text}`);
				}
			});
		}
	});
};

export const shareViaMessageApp = () => {
	userName.subscribe((name) => {
		if (name) {
			currentPageHeaderData.subscribe((data) => {
				if (data) {
					const text = encodeURIComponent(`Hello! It's ${name} here! Don't miss out on our exciting group chat at ${data} on Wassup World. Join us now by clicking this link: ${window.location.href}`);
					const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

					if (isIOS) {
						window.location.href = `sms:&body=${text}`;
					} else {
						window.open(`sms:?body=${text}`);
					}
				}
			});
		}
	});
};

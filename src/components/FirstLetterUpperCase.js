import React from 'react';

export const FirstLetterUpperCase = (string) => {
	return (
		//capitalose first letter
		string.charAt(0).toUpperCase() + string.slice(1)
	);
};

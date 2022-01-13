import { NextResponse, NextRequest } from 'next/server';

export const middleware = async (req, ev) => {
	const { pathname } = req.nextUrl;

	if (pathname == '/') return NextResponse.redirect('/dex/1');
	return NextResponse.next();
};

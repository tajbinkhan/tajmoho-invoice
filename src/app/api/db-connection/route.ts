import ApiResponse from '@/core/ApiResponse';
import { prisma } from '@/database/adapters/Prisma/PrismaClientAdapter';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, response: NextResponse) => {
	try {
		await prisma.$connect();
		return ApiResponse.success('Connected to the database', response);
	} catch (error) {
		return ApiResponse.error('Error connecting to the database', response);
	} finally {
		await prisma.$disconnect();
	}
};

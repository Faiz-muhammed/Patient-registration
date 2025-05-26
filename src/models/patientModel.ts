import { getDatabase } from '../db/database';
import type { Patient } from '../types/patient';

export const registerPatient = async (data: Patient): Promise<Patient> => {
  const db = await getDatabase();

  const result:any = await db.query(
    `INSERT INTO patients 
      (firstName, lastName, dateOfBirth, gender, email, phone, address) 
     VALUES 
      ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      data.firstName,
      data.lastName,
      data.dateOfBirth,
      data.gender,
      data.email ?? null,
      data.phone ?? null,
      data.address ?? null,
    ]
  );

  return result.rows?.[0];
};

export const getAllPatients = async (): Promise<Patient[]> => {
  const db = await getDatabase();
  const result: any = await db.query(
    `SELECT * FROM patients ORDER BY lastName, firstName`
  );
  return result.rows || [];
};

export const executeQuery = async (
  sqlQuery: string,
  params: any[] = []
): Promise<{ success: boolean; data: any[]; error: string | null }> => {
  try {
    const db = await getDatabase();
    const result = await db.query(sqlQuery, params);
    return {
      success: true,
      data: result.rows || [],
      error: null,
    };
  } catch (error: any) {
    console.error("Query execution error:", error);
    return {
      success: false,
      data: [],
      error: error.message ?? 'Unknown error',
    };
  }
};

/*
  Warnings:

  - Added the required column `category` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('beginner', 'intermediate', 'expert', 'all');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('english', 'french', 'spanish', 'portugese', 'arabic', 'polish', 'german', 'italian', 'bangla', 'korean', 'russian', 'japanese', 'hindi');

-- CreateEnum
CREATE TYPE "CourseCategory" AS ENUM ('development', 'business', 'finance_and_accounting', 'it_and_software', 'office_productivity', 'personal_development', 'design', 'marketing', 'lifestyle', 'photography_and_video', 'health_and_fitness', 'music', 'teaching_and_academics');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "category" "CourseCategory" NOT NULL,
ADD COLUMN     "language" "Language" NOT NULL,
ADD COLUMN     "level" "CourseLevel" NOT NULL,
ADD COLUMN     "subtitle" "Language";

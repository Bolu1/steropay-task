/* eslint-disable prettier/prettier */
import {  IsOptional, IsString, IsNotEmpty } from "class-validator"
export class MediaDto {

    @IsString()
    @IsNotEmpty()
    type: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsOptional()
    status?: string
}
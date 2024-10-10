'use client'

import { useEffect } from "react";
import useFetch from "./utils/useFetch";
import { Grid } from "react-loader-spinner";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import GameCard from "./_components/GameCard";
import GameGrid from "./_components/GameCard";

export default function Home() {
	const { data, loading } = useFetch<TopStreamsData[] | null>(process.env.NEXT_PUBLIC_URL_TOP_STREAMS);

	useEffect(() => {
		console.log("Top", data);
	}, [data])

	if (loading) {
		return (
			<div className="flex h-full justify-center items-center">
				<Grid
					visible={true}
					height="80"
					width="80"
					color="#4fa94d"
					ariaLabel="grid-loading"
					radius="12.5"
					wrapperStyle={{}}
					wrapperClass="grid-wrapper"
				/>
			</div>
		)
	}

	return (
		<main className="p-4 text-background h-full">
			<h1 className="text-center text-xl font-bold mb-6">Top Games</h1>
			<div className="w-full p-0">
				<GameGrid games={data} />
			</div>
		</main>
	);
}

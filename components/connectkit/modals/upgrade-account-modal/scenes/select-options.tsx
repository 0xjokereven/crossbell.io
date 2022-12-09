import React from "react";
import { Button, Text } from "@mantine/core";

import Image from "@/components/common/Image";
import email from "@/public/images/connect-kit/email-icon.svg";
import wallet from "@/public/images/connect-kit/wallet-icon.svg";

import { SceneKind } from "../types";
import { useScenesStore, useModalStore } from "../stores";
import { Header } from "../components/header";
import { Selections } from "../../connect-modal/components/selections";

export function SelectOptions() {
	const goToScene = useScenesStore(({ goTo }) => goTo);
	const hideModal = useModalStore((s) => s.hide);

	return (
		<>
			<Header title="Upgrade Account" leftNode={false} />

			<div data-animation="scale-fade-in" className="sm:w-312px mx-24px pb-18px">
				<p className="text-14px font-400 text-[#999] my-10px text-center">
					{`Email account can't mint because a wallet is required to keep your assets. `}
					<a
						className="text-[#6AD991]"
						href=""
						target="_blank"
						rel="noreferrer"
					>
						Learn More
					</a>
				</p>
				<Selections
					items={[
						{
							id: SceneKind.upgradeToWallet,
							title: "Upgrade to Wallet",
							style: { background: "#6AD991", color: "#FFF" },
							icon: (
								<Image
									src={wallet}
									alt="Wallet"
									placeholder="empty"
									className="w-36px h-36px"
								/>
							),
							onClick: () => goToScene(SceneKind.upgradeToWallet),
						},

						{
							id: "keep-email-login",
							title: "Keep Email Login",
							icon: (
								<Image
									alt="Email"
									src={email}
									placeholder="empty"
									className="w-36px h-36px"
								/>
							),
							onClick: hideModal,
						},
					]}
				/>

				<Button
					variant="subtle"
					color="gray"
					fullWidth
					className="mt-16px font-400 text-14px h-42px"
					leftIcon={<Text className="i-csb:light-bulb text-24px" />}
					onClick={() => goToScene(SceneKind.connectKindDifferences)}
				>
					What’s the difference
				</Button>
			</div>
		</>
	);
}

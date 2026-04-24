import { Window } from "@exegia/ui";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Outlet, useLocation } from "react-router";
import { Sidebar, Topbar } from "@/components";

const styles = {
	layout: style({
		display: "grid",
		gridTemplateAreas: [
			"sidebar topbar topbar",
			"sidebar content inspector",
			"sidebar content inspector",
		],
		gridTemplateColumns: "auto 1fr auto",
		gridTemplateRows: "auto 1fr auto",
		rowGap: 16,
		paddingX: 12,
		height: "full",
		columnGap: 12,
	}),
	sidebar: style({
		gridArea: "sidebar",
	}),
	content: style({
		backgroundColor: "base",
		borderRadius: "xl",
		position: "relative",
		boxShadow: "emphasized",
		padding: 20,
		flex: 1,
		height: "full",
		width: "full",
		gridArea: "content",
	}),
	topbar: style({
		display: "flex",
		flexDirection: "column",
		gap: 4,
		gridArea: "topbar",
	}),
	inspector: style({
		gridArea: "inspector",
	}),
};

export default function Layout() {
	const { pathname } = useLocation();

	return (
		<Window>
			<LayoutGroup>
				<motion.div layout className={styles.layout}>
					<div className={styles.sidebar}>
						<Sidebar />
					</div>

					<div className={styles.topbar}>
						<Topbar />
					</div>

					<motion.main layout className={styles.content}>
						<AnimatePresence mode="wait">
							<motion.div
								key={pathname}
								initial={{ y: -5, opacity: 0 }}
								animate={{ y: 0, opacity: 1, transition: { ease: "easeInOut" } }}
								exit={{ y: -5, opacity: 0, transition: { ease: "easeIn" } }}
								transition={{ duration: 0.3, delay: 0.3 }}
							>
								<Outlet />
							</motion.div>
						</AnimatePresence>
					</motion.main>
					<motion.div className={styles.inspector}>
						<></>
					</motion.div>
				</motion.div>
			</LayoutGroup>
		</Window>
	);
}

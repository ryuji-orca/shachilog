'use client'

import { Text } from '@radix-ui/themes'
import { motion } from 'framer-motion'
import { useOptimistic, type FC } from 'react'

import { handleLikeCounter } from './like-counter-server'

type LikeCounterType = {
	slug: string
	totalLikeCount: number
	userLikeCount: number
}

export const LikeCounter: FC<LikeCounterType> = ({
	slug,
	totalLikeCount,
	userLikeCount,
}) => {
	const handleLikeCounterWithSlug = handleLikeCounter.bind(null, {
		slug,
	})

	const [optimisticMessages, addOptimisticMessage] = useOptimistic<
		{ count: number },
		number
	>({ count: userLikeCount ?? 0 }, (state, newCount) => {
		return { ...state, count: newCount }
	})

	return (
		<form
			action={async () => {
				if (optimisticMessages.count >= 5) {
					return
				}
				const newCount = userLikeCount + 1
				addOptimisticMessage(newCount)
				await handleLikeCounterWithSlug()
			}}
			className="flex items-center space-x-2"
		>
			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				disabled={optimisticMessages.count >= 5}
				aria-label={`like button Current fill level: ${optimisticMessages.count * 20}%`}
				type="submit"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="36"
					height="36"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<defs>
						<linearGradient id="fillGradient" x1="0%" y1="100%" x2="0%" y2="0%">
							<motion.stop
								offset={`${optimisticMessages.count * 20}%`}
								stopColor="#E54666"
								initial={{
									offset: `${optimisticMessages.count * 20}%`,
								}}
								animate={{
									offset: `${optimisticMessages.count * 20}%`,
								}}
								transition={{ type: 'spring', stiffness: 100, damping: 10 }}
							/>
							<motion.stop
								offset={`${optimisticMessages.count * 20}%`}
								stopColor="#60646C"
								initial={{
									offset: `${optimisticMessages.count * 20}%`,
								}}
								animate={{
									offset: `${optimisticMessages.count * 20}%`,
								}}
								transition={{ type: 'spring', stiffness: 100, damping: 10 }}
							/>
						</linearGradient>
					</defs>
					<path
						d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
						fill="url(#fillGradient)"
						stroke="none"
					/>
				</svg>
			</motion.button>

			<Text color="ruby" data-testid="like-count">
				{totalLikeCount}
			</Text>
		</form>
	)
}

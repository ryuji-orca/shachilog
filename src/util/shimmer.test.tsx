/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Image from 'next/image'
import { expect, test } from 'vitest'
import { shimmer, toBase64 } from './shimmer'

test('nextImageを使った時にplaceholderが正しく機能する', async () => {
	const alt = 'ryujiのアイコン'
	const src = '/image/about/ryuji-icon.webp'

	render(
		<Image
			className="rounded-full"
			width={64}
			height={64}
			src={src}
			alt={alt}
			placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(64, 64))}`}
		/>,
	)

	const nextImage = screen.getByAltText(alt)

	expect(nextImage.getAttribute('alt')).toEqual(alt)
})

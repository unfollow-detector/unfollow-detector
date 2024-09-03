import { render, fireEvent, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import UsersList from './UsersList.svelte';
import type { User } from '$lib/shared/User';

describe('UsersList Component', () => {
	const followers: User[] = [
		{ href: 'youDontFollow', timestamp: 0, value: 'youDontFollow' },
		{ href: 'mutual', timestamp: 0, value: 'mutual' }
	];

	const following = [
		{ href: 'doesntFollowYou', timestamp: 0, value: 'doesntFollowYou' },
		{ href: 'mutual', timestamp: 0, value: 'mutual' }
	];

	it('should render following that do not follow you', async () => {
		const { getByText, queryByText } = render(UsersList, {
			props: { followers, following }
		});
		const followingThatDontFollowYou = screen.getByTestId('followingThatDontFollowYou');
		await fireEvent.click(followingThatDontFollowYou);

		expect(getByText(/doesntFollowYou/i)).toBeInTheDocument();
		expect(queryByText(/youDontFollow/i)).toBeNull();
		expect(queryByText(/mutual/i)).toBeNull();
	});

	it('should render followers that you do not follow', async () => {
		const { getByText, queryByText } = render(UsersList, {
			props: { followers, following }
		});
		const followersThatYouDontFollow = screen.getByTestId('followersThatYouDontFollow');
		await fireEvent.click(followersThatYouDontFollow);

		expect(getByText(/youDontFollow/i)).toBeInTheDocument();
		expect(queryByText(/doesntFollowYou/i)).toBeNull();
		expect(queryByText(/mutual/i)).toBeNull();
	});
});

/**
 * WordPress dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { username, organization, repo } = attributes;
	const [props, setProps] = useState();

	const COMMIT_COUNT_MIN = 3;
	const COMMIT_COUNT_MAX = 12;

	useEffect(() => {
		// A fresh block just inserted
		if (!username || !organization || !repo) {
			return;
		}
		const storedData = window.sessionStorage.getItem(
			`${username}_${organization}_${repo}`
		);
		if (storedData) {
			setProps(JSON.parse(storedData));
		} else {
			// Make the query
			// because I hit the limit
			// window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(commits));
			fetch(
				// `https://api.github.com/repos/${organization}/${repo}/pulls?author=${username}&per_page=${COMMIT_COUNT_MAX}`
				`https://api.github.com/search/issues?per_page=50&q=state:open+assignee%3A${username}+repo%3A${organization}/${repo}+type:pr|issue`
			)
				.then((response) => response.json())
				.then(({ items }) => {
					//set the data
					setProps(items);
					//Set the storage key
					window.sessionStorage.setItem(
						`${username}_${organization}_${repo}`,
						JSON.stringify(items)
					);
				});
		}
	}, [username]);

	return (
		<div {...useBlockProps()}>
			{props?.length > 0 && (
				<ul>
					{props.map((prop) => (
						<li key={prop.id}>
							<a href="#">{prop.title}</a>
						</li>
					))}
				</ul>
			)}
			<InspectorControls>
				<PanelBody
					title={__('Github Settings', 'github-activity')}
					icon="github"
				>
					<TextControl
						label={__('Username', 'github-activity')}
						value={username}
						onChange={(newUserName) =>
							setAttributes({ username: newUserName })
						}
					/>
					<TextControl
						label={__('Organization', 'github-activity')}
						value={organization}
						onChange={(newOrg) =>
							setAttributes({ organization: newOrg })
						}
					/>
					<TextControl
						label={__('Repository', 'github-activity')}
						value={repo}
						onChange={(newRepo) => setAttributes({ repo: newRepo })}
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}

module.exports = async ({ github, context, command, core, commentId }) => {
  const Comment = require('./comment.cjs')
  const comment = new Comment({ github, context, commentId })

  if (command === 'merge') {
    console.log('Run merge')
		let pendingReview = await github.rest.pulls.createReview({
			...context.repo,
			pull_number: context.issue.number,
		})

		await github.rest.pulls.submitReview({
			...context.repo,
			pull_number: context.issue.number,
			event: 'APPROVE',
			review_id: pendingReview.data.id
		})
    await github.rest.pulls.update({
      ...context.repo,
      pull_number: context.issue.number,
      auto_merge: {
        merge_method: 'squash',
      },
    });
    await comment.createOrUpdateComment(`    Auto-merge enabled`)
    core.info('Auto-merge enabled')
    return
  }

  if (command === 'cancel-merge') {
    console.log('Run cancel-merge')
		await github.rest.pulls.submitReview({
			...context.repo,
			pull_number: context.issue.number,
			event: 'REQUEST_CHANGES',
			body: 'Dismissed'
		})
    await github.rest.pulls.update({
      ...context.repo,
      pull_number: context.issue.number,
      auto_merge: null,
    });
    await comment.createOrUpdateComment(`    Auto-merge disabled`)

    core.info('Auto-merge disabled')
    return
  }
}

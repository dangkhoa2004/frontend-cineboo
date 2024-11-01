<template>
    <div class="jobs-container">
        <div class="jobs-header">
            <h2>{{ $t('message.home') }} / {{ $t('message.job') }}</h2>
            <div class="jobs-search-bar">
                <input type="text" placeholder="Tìm kiếm">
            </div>
        </div>
        <div class="jobs-filters">
            <button class="jobs-filter jobs-active">{{ $t('message.all') }}</button>
            <button class="jobs-filter">{{ $t('message.success') }}</button>
            <button class="jobs-filter">{{ $t('message.unfinished') }}</button>
        </div>
        <div class="jobs-project-list">
            <div class="jobs-project-card">
                <div class="jobs-project-info">
                    <h3>{{ $t('message.project') }} Kimshen</h3>
                    <p>{{ $t('message.status') }}: <span class="jobs-status jobs-incomplete">{{ $t('message.unfinished')
                            }}</span></p>
                </div>
                <div class="jobs-project-meta">
                    <span class="jobs-date">30/10/2019</span>
                    <span class="jobs-priority jobs-low">{{ $t('message.low') }}</span>
                </div>
            </div>
            <div class="jobs-project-card">
                <div class="jobs-project-info">
                    <h3>{{ $t('message.project') }} Thăng Long</h3>
                    <p>{{ $t('message.status') }}: <span class="jobs-status jobs-complete">{{
                        $t('message.success') }}</span></p>
                </div>
                <div class="jobs-project-meta">
                    <span class="jobs-date">30/09/2019</span>
                    <span class="jobs-priority jobs-high">{{ $t('message.high') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="./assets/styles.css"></style>
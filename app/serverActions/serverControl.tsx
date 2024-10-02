'use server';
import { exec } from 'child_process';

export async function nextRebuild() {
    console.log('nextRebuild');
    if (process.env.TEST_ENV === 'true') {
        console.log('does nothing as test environment');
    } else if (process.env.TEST_ENV === 'false') {
        exec('npm run next-rebuild', function(err, stdout, stderr) {
            if (err) console.error(stderr);
        });
    }
}

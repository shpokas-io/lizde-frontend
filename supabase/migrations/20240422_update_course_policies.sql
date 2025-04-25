-- Drop existing policies
drop policy if exists "Allow public read access" on courses;
drop policy if exists "Courses are viewable by everyone" on courses;

-- Create new policies that check user_courses.has_access
create policy "Users with access can view courses"
    on courses for select
    using (
        exists (
            select 1
            from user_courses
            where user_courses.user_id = auth.uid()
            and user_courses.has_access = true
        )
    );

-- Create policy for service role
create policy "Service role can manage all courses"
    on courses for all
    using (auth.role() = 'service_role'); 
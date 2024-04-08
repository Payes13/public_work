import { redirect } from 'next/navigation';

import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';

// localhost:3000/transformations/add/[type]/page.tsx
// localhost:3000/transformations/add/restore
// localhost:3000/transformations/add/remove

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();
  // THIS [type] REFERENCES THE ONE IN MY route
  const transformation = transformationTypes[type];

  // BC await getUserById(userId) WAS COMPLAINING THAT THE userId COULD BE NULL
  if(!userId) redirect('/sign-in')

    // WE NEED THE _id FROM OUR DB INSTEAD OF THE clerkId
  const user = await getUserById(userId);

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      {/* THIS user._id IS COMING FROM OUR DB */}
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage